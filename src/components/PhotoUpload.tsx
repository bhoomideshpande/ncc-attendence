import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PhotoUpload = () => {
  const institutes = [
    { id: "kle_tech", name: "KLE Technological University, Hubballi", shortName: "KLE Tech" },
    { id: "kims_hubli", name: "KIMS Hubballi", shortName: "KIMS" },
    { id: "bvb_college", name: "BVB College Hubballi", shortName: "BVB" },
    { id: "dharwad_university", name: "Karnatak University Dharwad", shortName: "KUD" },
    { id: "kle_pharmacy", name: "KLE College of Pharmacy, Hubballi", shortName: "KLE Pharmacy" },
    { id: "kle_law", name: "KLE Law College, Hubballi", shortName: "KLE Law" },
    { id: "kle_pu_hubli", name: "KLE PU College, Hubballi", shortName: "KLE PU Hubli" },
    { id: "kle_pu_dharwad", name: "KLE PU College, Dharwad", shortName: "KLE PU Dharwad" },
    { id: "kle_science_college", name: "KLE Science College, Hubballi", shortName: "KLE Science" },
    { id: "sdm_college", name: "SDM College, Dharwad", shortName: "SDM Dharwad" },
    { id: "jss_college", name: "JSS College, Dharwad", shortName: "JSS Dharwad" },
    { id: "pg_centre_hubli", name: "PG Centre, Hubballi", shortName: "PG Centre" },
    { id: "engg_college_1", name: "Govt. Engineering College, Hbl", shortName: "GEC Hubli" },
    { id: "engg_college_2", name: "Dharwad Engineering College", shortName: "DEC" },
    { id: "arts_college_hubli", name: "Arts & Commerce College, Hubballi", shortName: "AC Hubli" },
    { id: "arts_college_dwd", name: "Arts & Commerce College, Dharwad", shortName: "AC Dharwad" },
    { id: "medical_dwd", name: "Medical College, Dharwad", shortName: "Med Dharwad" },
    { id: "polytechnic_hubli", name: "Govt. Polytechnic, Hubballi", shortName: "Poly Hubli" },
  ];

  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [selectedInstitute, setSelectedInstitute] = useState('');

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const updated = [...photos];

    Array.from(files).forEach((file, index) => {
      if (index < 3) {
        const reader = new FileReader();
        reader.onload = () => {
          updated[index] = reader.result as string;
          setPhotos([...updated]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Upload Photos</h2>

      <div>
        <Label>Institute</Label>
        <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
          <SelectTrigger>
            <SelectValue placeholder="Select institute" />
          </SelectTrigger>
          <SelectContent>
            {institutes.map((inst) => (
              <SelectItem key={inst.id} value={inst.id}>{inst.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
        <Upload className="mx-auto h-10 w-10 text-gray-500 mb-4" />
        <p className="text-gray-600 mb-4">
          Upload 3 clear photos for the selected institute
        </p>

        <label className="cursor-pointer">
          <div className="px-6 py-3 border rounded-xl bg-white font-medium hover:bg-gray-50 inline-block">
            Choose files
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative border rounded-xl h-64 bg-gray-100 overflow-hidden"
          >
            <p className="absolute top-2 left-2 font-medium">{selectedInstitute ? institutes.find(i => i.id === selectedInstitute)?.shortName : `Photo ${index + 1}`}</p>

            {photo && (
              <span className="absolute top-2 right-2 text-green-600 text-xl">
                ✔
              </span>
            )}

            {photo ? (
              <img
                src={photo}
                className="w-full h-full object-cover"
                alt={`Preview ${index + 1}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No photo uploaded
              </div>
            )}

            {photo && selectedInstitute && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {institutes.find(i => i.id === selectedInstitute)?.shortName}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUpload;
