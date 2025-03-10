"use client"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const StepOne = ({ formData, nextStep, setFormData }) => {
  // ✅ **Formik & Yup Validation**
  const formik = useFormik({
    initialValues: {
      locationName: formData.locationName || "",
      aedPlacement: formData.aedPlacement || "",
      streetAddress: formData.streetAddress || "",
      city: formData.city || "",
      state: formData.state || "",
      zipCode: formData.zipCode || "",
      county: formData.county || "",
      businessPhone: formData.businessPhone || "",
      aedPlaceType: formData.aedPlaceType || "",
    },
    validationSchema: Yup.object({
      locationName: Yup.string().required("Location name is required"),
      aedPlacement: Yup.string().required("AED placement description is required"),
      streetAddress: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, "Enter a valid 5-digit zip code")
        .required("Zip code is required"),
      county: Yup.string().required("County is required"),
      businessPhone: Yup.string()
        .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
        .required("Business phone is required"),
      aedPlaceType: Yup.string().required("Please select an AED place type"),
    }),
    onSubmit: (values) => {
      setFormData({ ...formData, ...values });
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-semibold">1) AED Location Information</h2>
      <div className="space-y-4">
        {/* Location Name */}
        <div>
          <Label htmlFor="locationName">Location Name</Label>
          <Input
            id="locationName"
            name="locationName"
            value={formik.values.locationName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter location name"
          />
          {formik.touched.locationName && formik.errors.locationName && (
            <p className="text-red-500 text-sm">{formik.errors.locationName}</p>
          )}
        </div>

        {/* AED Placement */}
        <div>
          <Label htmlFor="aedPlacement">Description of AED Placement</Label>
          <Textarea
            id="aedPlacement"
            name="aedPlacement"
            value={formik.values.aedPlacement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe where the AED is placed"
          />
          {formik.touched.aedPlacement && formik.errors.aedPlacement && (
            <p className="text-red-500 text-sm">{formik.errors.aedPlacement}</p>
          )}
        </div>

        {/* Street Address */}
        <div>
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter street address"
          />
          {formik.touched.streetAddress && formik.errors.streetAddress && (
            <p className="text-red-500 text-sm">{formik.errors.streetAddress}</p>
          )}
        </div>

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter city"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm">{formik.errors.city}</p>
            )}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter state"
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-sm">{formik.errors.state}</p>
            )}
          </div>
        </div>

        {/* Zip Code & County */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter zip code"
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="text-red-500 text-sm">{formik.errors.zipCode}</p>
            )}
          </div>
          <div>
            <Label htmlFor="county">County</Label>
            <Input
              id="county"
              name="county"
              value={formik.values.county}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter county"
            />
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
            name="businessPhone"
            type="tel"
            value={formik.values.businessPhone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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

        {/* Next Button */}
        <div className="mt-6 flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </div>
    </form>
  );
};

export default StepOne;
