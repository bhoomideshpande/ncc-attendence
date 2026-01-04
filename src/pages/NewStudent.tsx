import React, { useState } from "react";
import { FlagHeader } from "@/components/FlagHeader";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Upload, Check } from "lucide-react";

/* ---------------------- HEIC → JPG Converter ---------------------- */
const convertHEICtoJPG = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const heic2any = (await import("heic2any")).default;
        const resultBlob: any = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });

        resolve(URL.createObjectURL(resultBlob));
      } catch (err) {
        console.log("HEIC conversion failed, using fallback:", err);
        resolve(URL.createObjectURL(file));
      }
    };

    reader.readAsArrayBuffer(file);
  });
};

const NewStudent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    nationality: "Indian",
    address: "",
    phone: "",
    email: "",
    parentName: "",
    instituteCode: "",
  });

  const [photos, setPhotos] = useState<string[]>([]);

  /* ---------------------- NEXT BUTTON VALIDATION ---------------------- */
  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.dob.trim() ||
        !formData.gender.trim()
      ) {
        toast.error("Please fill all required fields: Name, DOB, Gender.");
        return;
      }
    }

    setStep(step + 1);
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  /* ---------------------- PHOTO UPLOAD (HEIC SUPPORTED) ---------------------- */
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];

    for (const file of Array.from(files)) {
      if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
        const jpg = await convertHEICtoJPG(file);
        newPhotos.push(jpg);
      } else {
        newPhotos.push(URL.createObjectURL(file));
      }
    }

    setPhotos([...photos, ...newPhotos].slice(0, 3));
  };

  /* ---------------------- SUBMIT ---------------------- */
  const handleSubmit = async () => {
    try {
      const studentData = {
        roll: `NCC${new Date().getFullYear()}${String(Date.now()).slice(-6)}`,
        ...formData,
        photos,
      };

      const response = await axios.post('http://localhost:5001/api/students/register', studentData);

      toast.success("Student registered successfully!");
      navigate("/students");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register student");
    }
  };

  /* ---------------------- UI ---------------------- */
  return (
    <div className="min-h-screen bg-background">
      <FlagHeader />
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">New Student Admission</h1>
          <p className="text-muted-foreground mb-6">Step {step} of 3</p>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full ${
                  s <= step ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Basic Information"}
                {step === 2 && "Upload Photos"}
                {step === 3 && "Review & Submit"}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* ---------------------- STEP 1 ---------------------- */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* First + Last Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name *</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Last Name *</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* DOB + Gender */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date of Birth *</Label>
                      <Input
                        type="date"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Gender *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(gender) =>
                          setFormData({ ...formData, gender })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  {/* Phone + Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Parent + Institute */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Parent Name</Label>
                      <Input
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Institute Code</Label>
                      <Input
                        value={formData.instituteCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instituteCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------- STEP 2 ---------------------- */}
              {step === 2 && (
                <div className="space-y-8">
                  {/* Upload Box */}
                  <div className="border-2 border-dashed p-10 rounded-xl text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <p className="mb-4 text-gray-600">
                      Upload 3 clear photos (front-facing)
                    </p>

                    <label className="cursor-pointer">
                      <div className="px-6 py-3 border rounded-xl bg-white inline-block">
                        Choose files
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>

                  {/* Preview */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="relative h-64 p-2 border rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center"
                      >
                        <p className="absolute top-2 left-2 text-gray-700 font-medium">
                          Photo {i + 1}
                        </p>

                        {photos[i] && (
                          <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}

                        {photos[i] ? (
                          <img
                            src={photos[i]}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-500">No photo uploaded</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------- STEP 3 ---------------------- */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Student Information</h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <p>
                        <strong>Name:</strong> {formData.firstName}{" "}
                        {formData.lastName}
                      </p>
                      <p>
                        <strong>DOB:</strong> {formData.dob}
                      </p>
                      <p>
                        <strong>Gender:</strong> {formData.gender}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">
                      Uploaded Photos ({photos.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {photos.map((p, i) => (
                        <img
                          key={i}
                          src={p}
                          className="w-full h-40 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------- BUTTONS ---------------------- */}
              <div className="flex mt-8 gap-4">
                {step > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                )}

                {step < 3 ? (
                  <Button className="ml-auto" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button className="ml-auto" onClick={handleSubmit}>
                    Submit & Generate ID
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NewStudent;
