"use client";

import Header from "../../components/ui/header";
import Footer from "../../components/ui/footer";
import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email Field is Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Password Field is Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="mt-2 text-gray-400">Enter your credentials to log in</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="w-full max-w-md mx-auto rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full" // Ensures full width
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
           
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-3">{formik.errors.email}</p>
                )}
           
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full" // Ensures full width
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-3">{formik.errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-1/3 px-4 py-2 rounded-md mt-4 ${
                  formik.isValid && formik.dirty
                    ? "bg-red-500 text-white"
                    : "bg-gray-400 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!formik.isValid || !formik.dirty}
              >
                Login
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer Stays at Bottom */}
      <Footer />
    </div>
  );
}
