"use client";
import { Label } from "@/components/ui/label"; // Correct import
import { Button } from "@/components/ui/button"; // Correct import
import { useEffect, useState } from "react";
import { getProfile } from "@/http/get-profile";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";
import {
  DeletePreviousUserAvatar,
  updateUserAvatarAction,
} from "@/app/profile/action";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { UploadButton } from "@/utils/uploadthing";
import { updateUser } from "@/http/update-profile";

export default function AvatarForm() {
  const [user, setUser] = useState([]);
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {user.map((user: any) => (
        <form>
          <div className="space-y-2 mt-2">
            <Label>Foto de Perfil</Label>
            <img
              src={
                user.avatar_url
                  ? user.avatar_url
                  : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              }
              alt="Avatar"
            />
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                updateUserAvatarAction(res[0].url)
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </form>
      ))}
      <Toaster />
    </>
  );
}
