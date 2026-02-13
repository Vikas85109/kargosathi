import { useNavigate } from 'react-router-dom';
import { useBroker } from '../../context/BrokerContext';
import { useToast } from '../../context/ToastContext';
import { useDraftSave } from '../../hooks/useDraftSave';
import Stepper from '../../components/Stepper';
import Step1BasicInfo from './Step1BasicInfo';
import Step2CompanyInfo from './Step2CompanyInfo';
import Step3Documents from './Step3Documents';
import Step4BankDetails from './Step4BankDetails';
import Step5OperatingRegions from './Step5OperatingRegions';
import Step6Commission from './Step6Commission';
import Step7Review from './Step7Review';

export default function OnboardingPage() {
  const { currentStep, goToStep, submit, formData } = useBroker();
  const { toast } = useToast();
  const navigate = useNavigate();

  useDraftSave(formData, currentStep);

  const next = () => goToStep(currentStep + 1);
  const back = () => goToStep(currentStep - 1);

  const handleSubmit = async () => {
    try {
      await submit();
      toast('success', 'Application submitted successfully!');
      navigate('/status');
    } catch {
      toast('error', 'Failed to submit application');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo onNext={next} />;
      case 2: return <Step2CompanyInfo onNext={next} onBack={back} />;
      case 3: return <Step3Documents onNext={next} onBack={back} />;
      case 4: return <Step4BankDetails onNext={next} onBack={back} />;
      case 5: return <Step5OperatingRegions onNext={next} onBack={back} />;
      case 6: return <Step6Commission onNext={next} onBack={back} />;
      case 7: return <Step7Review onBack={back} onSubmit={handleSubmit} />;
      default: return <Step1BasicInfo onNext={next} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">KS</div>
            <span className="font-bold text-slate-800 text-sm">Broker Onboarding</span>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">Step {currentStep} of 7</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Stepper current={currentStep} />
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-sm">
          {renderStep()}
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">Your progress is auto-saved</p>
      </div>
    </div>
  );
}
