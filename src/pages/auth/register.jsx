import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { Separator } from "@radix-ui/react-separator";
import { registerUser } from "../../database/firebaseAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../../validation/validationSchema";
import { createUserProfile } from "../../database/firebaseUtils";
import InputPasswordWithHookForm from "../../components/ui/password-input";
import { setLoginUserDataToRedux } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useToast } from "../../components/ui/toast";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();  // Ensure toast function is being properly destructured

  const methods = useForm({
    resolver: yupResolver(registerValidation),
  });

  const { reset } = methods;

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const resp = await registerUser(formData);

      if (resp.error) {
        if (toast) {
          toast({
            title: `Error: ${resp.code}`,
            description: resp.message || "Something went wrong. Please try again!",
            variant: "destructive",
          });
        }
        return;
      }

      // Create user profile
      createUserProfile({
        id: resp.id,
        name: `${formData.firstName} ${formData.lastName}`, // Combine first and last name
        email: formData.email,
        role: "user",
      });

      // Set user data in Redux
      dispatch(
        setLoginUserDataToRedux({
          id: resp.id,
          email: formData.email,
          role: "user",
        })
      );

      // Reset the form and show success toast
      reset();
      if (toast) {
        toast.success("You are successfully registered");
      }

      // Navigate to login page
      navigate("/login");

    } catch (error) {
      if (toast) {
        toast({
          title: "Unexpected Error!",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      }
    }
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold text-center">Create your account</h2>
        <p className="mb-6 text-center text-gray-500">Welcome! Please fill in the details to get started.</p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Separator className="mb-4" />

            {/* First and Last Name Fields */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <label className="text-sm font-medium text-gray-700">First name</label>
                <Input
                  {...methods.register("firstName")}
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full mt-2"
                />
                {methods.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{methods.formState.errors.firstName.message}</p>
                )}
              </div>

              <div className="relative flex-1">
                <label className="text-sm font-medium text-gray-700">Last name</label>
                <Input
                  {...methods.register("lastName")}
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full mt-2"
                />
                {methods.formState.errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{methods.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="relative mt-4">
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <Input
                {...methods.register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2"
              />
              {methods.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">{methods.formState.errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full mt-4">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <InputPasswordWithHookForm
                name="password"
                placeholder="Enter your password"
                className="w-full mt-2"
                setValue={methods.setValue}
              />
              {methods.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">{methods.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-6">
              Continue
            </Button>
          </form>
        </FormProvider>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
