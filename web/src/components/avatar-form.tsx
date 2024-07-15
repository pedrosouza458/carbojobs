"use client";
import { Label } from "@/components/ui/label"; // Correct import
import { Button } from "@/components/ui/button"; // Correct import
import { useEffect, useState } from "react";
import { getProfile } from "@/http/get-profile";
import { Input } from "@/components/ui/input";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";
import { DeletePreviousUserAvatar, updateUserAvatarAction } from "@/app/profile/action";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

export default function AvatarForm() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    getProfile().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const router = useRouter();

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    updateUserAvatarAction,
    () => {
      toast({
        title: "Foto de perfil alterada",
      });
      router.push("/profile");
    }
  );

  return (
    <>
      {user.map((user: any) => (
        <form key={user.id} onSubmit={handleSubmit}>
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
            <Input name="avatar_img" type="file" />
            <Button type="submit" className="pt-2 w-full">Atualizar foto</Button>
          </div>
        </form>
      ))}
      <Toaster/>
    </>
  );
}
