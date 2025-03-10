"use client"

import { useState,useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Checkbox } from "../../components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
// import { useToast } from "../../hooks/use-toast"
import Header from "../../components/ui/header";
import Footer from "../../components/ui/footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Head from "next/head";






export default function RegisterAED() {
  const [step, setStep] = useState(1);
  const totalSteps = 5
  // const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
const [message, setMessage] = useState(""); // Add this line

const nextStep = async () => {
  const errors = await formik.validateForm();
  if (Object.keys(errors).length === 0) {
    setStep(step + 1);
  } else {
    formik.setTouched(errors);
  }
};



const prevStep = () => {
  if (step > 1) {
    setStep(step - 1);
  }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
 formik.setFieldValue(name, type === "checkbox" ? checked : value);
  }

  const handleSelectChange = (name, value) => {
  formik.setFieldValue(name, value);
};

const handleFileChange = (e) => {
  formik.setFieldValue("aedImage", e.target.files[0]);
};


    const validationSchema = [
    Yup.object({
      locationName: Yup.string().required("Location Name is required"),
      // aedPlacement: Yup.string().required("AED Placement description is required"),
      // streetAddress: Yup.string().required("Street Address is required"),
      // city: Yup.string().required("City is required"),
      // state: Yup.string().required("State is required"),
      // zipCode: Yup.string().required("Zip Code is required"),
      // businessPhone: Yup.string().required("Business Phone is required"),
      // aedPlaceType: Yup.string().required("AED Place Type is required"),
    }),
    Yup.object({
      responsibleParty: Yup.string().required("Responsible Party is required"),
      // responsiblePhone: Yup.string().required("Phone is required"),
      // responsibleEmail: Yup.string().email("Invalid email").required("Email is required"),
    }),

       Yup.object({
      aedManufacturer: Yup.string().required("AED MANUFACTURER is required"),
      // responsiblePhone: Yup.string().required("Phone is required"),
      // responsibleEmail: Yup.string().email("Invalid email").required("Email is required"),
    }),

    Yup.object({
  aedInstallDate: Yup.date()
    .required("AED Install Date is required"),
    }),
    Yup.object({
  emergencySupplies: Yup.array()
    .min(1, "At least one option must be selected")
}),
  ];


  const formik = useFormik({
    initialValues: {
    locationName: "",
    aedPlacement: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    county: "",
    businessPhone: "",
    aedPlaceType: "",
    responsibleParty: "",
    responsiblePhone: "",
    responsibleEmail: "",
    restrictedAccess: false,
    notFixedLocation: false,
    accessible24_7: false,
    aedManufacturer: "",
    aedModel: "",
    aedAssetId: "",
    aedSerialNumber: "",
    aedInstallDate: "",
    batteryExpirationDate: "",
    electrodeExpirationDate: "",
    pediatricElectrodeExpirationDate: "",
    medicalDirection: "",
    accessCode: "",
    firstAidStation: false,
    bleedingControl: false,
    epinephrine: false,
    naloxone: false,
    aedImage: null,
    emergencySupplies: [], 
    },
    validationSchema: validationSchema[step - 1],
    validateOnBlur: true,
onSubmit: async (values) => {
  await formik.validateForm();
  if (step < totalSteps) {
    setStep(step + 1);
  } else {
    try {
      console.log("Submitting FormData...");
          setIsSubmitting(true);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== "aedImage" && values[key]) {
          formData.append(key, values[key]);
        }
      });

      if (values.aedImage) {
        formData.append("aedImage", values.aedImage);
      }

      console.log("Final FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        "https://aed-backend-1.onrender.com/register-aed",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        setMessage("AED Registered Successfully! Redirecting...");
  

        setTimeout(() => {
          window.location.href = "/";
                setIsSubmitting(false);
        }, 3000); // 3 seconds delay before redirect
      }
    } catch (error) {
      console.error("API Error:", error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }finally {
          // setIsSubmitting(false);
        }
  }
}
  });

useEffect(() => {
  console.log("Formik Errors:", formik.errors);
}, [formik.errors]);


  return (

    
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
     <Header/>


      {/* Main Content */}
      <main className="mx-auto mt-20 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-8 text-center">
            <Heart className="mx-auto h-12 w-12 text-[#E31837]" />
            <h1 className="mt-4 text-3xl font-bold">Register a new AED</h1>
            <p className="mt-2 text-gray-400">Help save lives by registering your AED</p>
          </div>
            <div>{message && <div className="text-green-600 font-bold">{message}</div>}</div>
          <form onSubmit={formik.handleSubmit} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            {/* Step 1 */}
        {step === 1 && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">1) AED Location Information</h2>
    <div className="space-y-4">
      
      {/* Location Name */}
      <div>
        <Label htmlFor="locationName">Location Name</Label>
        <Input id="locationName" {...formik.getFieldProps("locationName")} placeholder="Enter location name" />
        {formik.touched.locationName && formik.errors.locationName && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.locationName}</p>
        )}
      </div>

      {/* AED Placement Description */}
      <div>
        <Label htmlFor="aedPlacement">Description of AED Placement</Label>
        <Textarea
          id="aedPlacement"
          {...formik.getFieldProps("aedPlacement")}
          placeholder="Describe where the AED is placed"
        />
        {formik.touched.aedPlacement && formik.errors.aedPlacement && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.aedPlacement}</p>
        )}
      </div>

      {/* Street Address */}
      <div>
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input
          id="streetAddress"
          {...formik.getFieldProps("streetAddress")}
          placeholder="Enter street address"
        />
        {formik.touched.streetAddress && formik.errors.streetAddress && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.streetAddress}</p>
        )}
      </div>

      {/* City & State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...formik.getFieldProps("city")} placeholder="Enter city" />
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500 text-sm">{formik.errors.city}</p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" {...formik.getFieldProps("state")} placeholder="Enter state" />
          {formik.touched.state && formik.errors.state && (
            <p className="text-red-500 text-sm">{formik.errors.state}</p>
          )}
        </div>
      </div>

      {/* Zip Code & County */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input id="zipCode" {...formik.getFieldProps("zipCode")} placeholder="Enter zip code" />
          {formik.touched.zipCode && formik.errors.zipCode && (
            <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
          )}
        </div>
        <div>
          <Label htmlFor="county">County</Label>
          <Input id="county" {...formik.getFieldProps("county")} placeholder="Enter county" />
          {formik.touched.county && formik.errors.county && (
            <p className="text-red-500 text-sm">{formik.errors.county}</p>
          )}
        </div>
      </div>

      {/* Business Phone */}
      <div>
        <Label htmlFor="businessPhone">Location Business Phone</Label>
        <Input
          id="businessPhone"
          {...formik.getFieldProps("businessPhone")}
          type="tel"
          placeholder="Enter business phone"
        />
        {formik.touched.businessPhone && formik.errors.businessPhone && (
          <p className="text-red-500 text-sm">{formik.errors.businessPhone}</p>
        )}
      </div>

      {/* AED Place Type */}
      <div>
        <Label htmlFor="aedPlaceType">AED Place Type</Label>
        <Select onValueChange={(value) => formik.setFieldValue("aedPlaceType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select AED place type" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-300 shadow-md">
            <SelectItem value="school">School</SelectItem>
            <SelectItem value="church">Church</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="medical">Medical Building</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.aedPlaceType && formik.errors.aedPlaceType && (
          <p className="text-red-500 text-sm">{formik.errors.aedPlaceType}</p>
        )}
      </div>
    </div>
  </div>
)}


            {/* Step 2 */}
     {step === 2 && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">2) Responsible Party Information</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="responsibleParty">AED Responsible Party</Label>
        <Input 
          id="responsibleParty" 
          {...formik.getFieldProps("responsibleParty")}
          placeholder="Enter responsible party name"
        />
        {formik.touched.responsibleParty && formik.errors.responsibleParty && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.responsibleParty}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="responsiblePhone">Phone</Label>
        <Input 
          id="responsiblePhone"
          type="tel"
          {...formik.getFieldProps("responsiblePhone")}
          placeholder="Enter phone number"
        />
        {formik.touched.responsiblePhone && formik.errors.responsiblePhone && (
          <p className="text-red-500 text-sm">{formik.errors.responsiblePhone}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="responsibleEmail">Email</Label>
        <Input 
          id="responsibleEmail"
          type="email"
          {...formik.getFieldProps("responsibleEmail")}
          placeholder="Enter email address"
        />
        {formik.touched.responsibleEmail && formik.errors.responsibleEmail && (
          <p className="text-red-500 text-sm">{formik.errors.responsibleEmail}</p>
        )}
      </div>
    </div>
  </div>
)}


            {/* Step 3 */}
   {step === 3 && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">3) AED Details</h2>
    <div className="space-y-4">
      {/* Restricted Access Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="restrictedAccess"
          checked={formik.values.restrictedAccess}
          onCheckedChange={(checked) => formik.setFieldValue("restrictedAccess", checked)}
        />
        <Label htmlFor="restrictedAccess">Restricted Access</Label>
      </div>

      {/* AED Not in a Fixed Location */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="notFixedLocation"
          checked={formik.values.notFixedLocation}
          onCheckedChange={(checked) => formik.setFieldValue("notFixedLocation", checked)}
        />
        <Label htmlFor="notFixedLocation">AED is not in a fixed location</Label>
      </div>

      {/* AED is 24/7 Accessible */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="accessible24_7"
          checked={formik.values.accessible24_7}
          onCheckedChange={(checked) => formik.setFieldValue("accessible24_7", checked)}
        />
        <Label htmlFor="accessible24_7">AED is 24/7 accessible</Label>
      </div>

      {/* AED Manufacturer */}
      <div>
        <Label htmlFor="aedManufacturer">AED Manufacturer</Label>
        <Input 
          id="aedManufacturer" 
          {...formik.getFieldProps("aedManufacturer")} 
          placeholder="Enter AED manufacturer"
        />
        {formik.touched.aedManufacturer && formik.errors.aedManufacturer && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.aedManufacturer}</p>
        )}
      </div>

      {/* AED Model */}
      <div>
        <Label htmlFor="aedModel">AED Model</Label>
        <Input 
          id="aedModel" 
          {...formik.getFieldProps("aedModel")} 
          placeholder="Enter AED model"
        />
        {formik.touched.aedModel && formik.errors.aedModel && (
          <p className="text-red-500 text-sm">{formik.errors.aedModel}</p>
        )}
      </div>

      {/* AED Asset ID */}
      <div>
        <Label htmlFor="aedAssetId">AED Asset ID</Label>
        <Input 
          id="aedAssetId" 
          {...formik.getFieldProps("aedAssetId")} 
          placeholder="Enter AED asset ID"
        />
        {formik.touched.aedAssetId && formik.errors.aedAssetId && (
          <p className="text-red-500 text-sm">{formik.errors.aedAssetId}</p>
        )}
      </div>

      {/* AED Serial Number */}
      <div>
        <Label htmlFor="aedSerialNumber">AED Serial Number</Label>
        <Input 
          id="aedSerialNumber" 
          {...formik.getFieldProps("aedSerialNumber")} 
          placeholder="Enter AED serial number"
        />
        {formik.touched.aedSerialNumber && formik.errors.aedSerialNumber && (
          <p className="text-red-500 text-sm">{formik.errors.aedSerialNumber}</p>
        )}
      </div>
    </div>
  </div>
)}


            {/* Step 4 */}
    {step === 4 && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">4) AED Maintenance Information</h2>
    <div className="space-y-4">

      {/* AED Install Date */}
      <div>
        <Label htmlFor="aedInstallDate">AED Install Date</Label>
        <Input
          id="aedInstallDate"
          type="date"
          {...formik.getFieldProps("aedInstallDate")}
          onFocus={(e) => e.target.showPicker?.()}
        />
        {formik.touched.aedInstallDate && formik.errors.aedInstallDate && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.aedInstallDate}</p>
        )}
      </div>

      {/* AED Battery Expiration Date */}
      <div>
        <Label htmlFor="batteryExpirationDate">AED Battery Expiration Date</Label>
        <Input
          id="batteryExpirationDate"
          type="date"
          {...formik.getFieldProps("batteryExpirationDate")}
          onFocus={(e) => e.target.showPicker?.()}
        />
        {formik.touched.batteryExpirationDate && formik.errors.batteryExpirationDate && (
          <p className="text-red-500 text-sm">{formik.errors.batteryExpirationDate}</p>
        )}
      </div>

      {/* AED Electrode Expiration Date */}
      <div>
        <Label htmlFor="electrodeExpirationDate">AED Electrode Expiration Date</Label>
        <Input
          id="electrodeExpirationDate"
          type="date"
          {...formik.getFieldProps("electrodeExpirationDate")}
          onFocus={(e) => e.target.showPicker?.()}
        />
        {formik.touched.electrodeExpirationDate && formik.errors.electrodeExpirationDate && (
          <p className="text-red-500 text-sm">{formik.errors.electrodeExpirationDate}</p>
        )}
      </div>

      {/* AED Pediatric Electrode Expiration Date */}
      <div>
        <Label htmlFor="pediatricElectrodeExpirationDate">AED Pediatric Electrode Expiration Date</Label>
        <Input
          id="pediatricElectrodeExpirationDate"
          type="date"
          {...formik.getFieldProps("pediatricElectrodeExpirationDate")}
          onFocus={(e) => e.target.showPicker?.()}
        />
        {formik.touched.pediatricElectrodeExpirationDate && formik.errors.pediatricElectrodeExpirationDate && (
          <p className="text-red-500 text-sm">{formik.errors.pediatricElectrodeExpirationDate}</p>
        )}
      </div>

      {/* Medical Direction */}
      <div>
        <Label htmlFor="medicalDirection">Medical Direction</Label>
        <Input
          id="medicalDirection"
          {...formik.getFieldProps("medicalDirection")}
          placeholder="Enter medical direction information"
        />
        {formik.touched.medicalDirection && formik.errors.medicalDirection && (
          <p className="text-red-500 text-sm">{formik.errors.medicalDirection}</p>
        )}
      </div>

      {/* Access Code */}
      <div>
        <Label htmlFor="accessCode">Access Code</Label>
        <Input
          id="accessCode"
          {...formik.getFieldProps("accessCode")}
          placeholder="Enter access code if applicable"
        />
        {formik.touched.accessCode && formik.errors.accessCode && (
          <p className="text-red-500 text-sm">{formik.errors.accessCode}</p>
        )}
      </div>

    </div>
  </div>
)}


            {/* Step 5 */}
        {step === 5 && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">5) Additional Information</h2>
    <div className="space-y-4">
      
      {/* Colocated Items Section */}
      <h3 className="text-lg font-semibold">Colocated Items</h3>
      <div className="space-y-2">
        {[
          { id: "firstAidStation", label: "First Aid Station" },
          { id: "bleedingControl", label: "Bleeding Control" },
          { id: "epinephrine", label: "Epinephrine (EpiPen)" },
          { id: "naloxone", label: "Naloxone" }
        ].map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              name="emergencySupplies"
              checked={formik.values.emergencySupplies.includes(item.id)}
              onCheckedChange={(checked) => {
                const updatedList = checked
                  ? [...formik.values.emergencySupplies, item.id] // Add item
                  : formik.values.emergencySupplies.filter((i) => i !== item.id); // Remove item
                formik.setFieldValue("emergencySupplies", updatedList);
              }}
            />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
        {formik.touched.emergencySupplies && formik.errors.emergencySupplies && (
          <p className="text-red-500 text-sm mt-3">{formik.errors.emergencySupplies}</p>
        )}
      </div>

      {/* AED Image Upload */}
      <div>
        <Label htmlFor="aedImage">Upload a picture of your AED</Label>
        <Input
          id="aedImage"
          name="aedImage"
          type="file"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            formik.setFieldValue("aedImage", file);
          }}
          className="mt-1"
        />
        {formik.touched.aedImage && formik.errors.aedImage && (
          <p className="text-red-500 text-sm">{formik.errors.aedImage}</p>
        )}
      </div>

    </div>
  </div>
)}


            <div className="mt-6 flex justify-between">
              <div className="flex justify-end space-x-4">
                {step > 1 && (
                  <Button type="button" onClick={prevStep} className="bg-[#E31837] text-white hover:bg-[#E31837]/90">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="bg-[#E31837] text-white hover:bg-[#E31837]/90">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
           <button
            type="submit"
            className={`px-4 py-2 rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60"></circle>
                </svg>
                Submitting...
              </span>
            ) : (
              step < totalSteps ? "Next" : "Submit"
            )}
          </button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
  <Footer/>
    </div>
  )
}

