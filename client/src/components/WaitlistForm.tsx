import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { waitlistFormSchema, type InsertWaitlistEntry } from "@shared/schema";
import { Check, Loader2 } from "lucide-react";

export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: ""
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "You have been added to our waitlist.",
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    }
  });
  
  const onSubmit = (data: InsertWaitlistEntry) => {
    mutation.mutate(data);
  };
  
  const handleReset = () => {
    setIsSuccess(false);
    reset();
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </div>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </div>
            )}
          </div>
          
          {/* Optional Company Name */}
          <div>
            <Label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company (Optional)
            </Label>
            <Input
              id="company"
              placeholder="Your Company"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              {...register("company")}
            />
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center h-12"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            By joining, you agree to our{" "}
            <a href="#" className="text-primary-600 hover:text-primary-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-600 hover:text-primary-800">
              Privacy Policy
            </a>.
          </p>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
          <p className="text-gray-600 mb-6">
            Thanks for joining our waitlist. We'll notify you when we're ready to launch. 
            Keep an eye on your inbox!
          </p>
          <Button
            variant="link"
            onClick={handleReset}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Add another email
          </Button>
        </div>
      )}
    </div>
  );
}
