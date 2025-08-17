
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuestionnaireForm from '../components/QuestionnaireForm';
import ResultsPage from '../components/ResultsPage';
import { UserProfile, getRecommendations, StockRecommendation } from '../utils/stockRecommendations';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const navigate = useNavigate();

  // ✅ Questionnaire Complete handler
  const handleQuestionnaireComplete = async (profile: UserProfile) => {
    const stockRecommendations = getRecommendations(profile);
    setUserProfile(profile);
    setRecommendations(stockRecommendations);
    setStep('results');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const userId = localStorage.getItem("userId");
if (!userId) {
  alert("User not logged in! Cannot save investment.");
  return;
}


    // ✅ Save user investment data to backend
    try {
      const res = await fetch("http://localhost:5000/investment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),  // 👈 signup ke bad saved ID
          type: profile.investmentType,            // Profile se investment type
          amount: profile.investmentAmount,        // Profile se amount
          riskLevel: profile.riskTolerance,        // Profile se risk level
          monthlyContribution: profile.monthlyAddition, // Profile se monthly contribution
          sectors: profile.sectors,                // Profile se sectors
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Investment saved:", data);
      } else {
        console.error("❌ Investment error:", data.error);
      }
    } catch (error) {
      console.error("🚨 Server error:", error);
    }
  };

  const handleReset = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <header className="mb-12">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-finance-blue">Spread Wealth</h1>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <p className="text-xl text-gray-600">
            Get personalized stock recommendations based on your risk profile and investment goals.
          </p>
        </div>
      </header>

      <main>
        {step === 'questionnaire' ? (
          <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
        ) : userProfile ? (
          <ResultsPage
            userProfile={userProfile}
            recommendations={recommendations}
            onReset={handleReset}
          />
        ) : null}
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Spread Wealth. All data is for demonstration purposes only.</p>
        <p className="mt-1">Not financial advice. Always do your own research before investing.</p>
      </footer>
    </div>
  );
};

export default Index;
