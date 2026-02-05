"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useMe } from "@/queries/useMe";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PasswordInput } from "@/components/atoms/PasswordInput";
import { useMyPostArticles } from "@/hooks/useArticle";
import { useState } from "react";
import type { ArticleParams } from "@/types/article";
import { ArticleMyPostList } from "@/components/organism/ArticleList";
import { useArticleDelete } from "@/hooks/useArticleDelete";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ProfileTemplate = () => {
  const { data: user } = useMe();
  const [page, setPage] = useState(1);
  const params: ArticleParams = {
    page,
    limit: 10,
  };

  const queryClient = useQueryClient();
  const myPostQuery = useMyPostArticles(params);

  const deleteMutation = useArticleDelete();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Data has been deleted.");
        queryClient.invalidateQueries({ queryKey: ["myPostArticles"] });
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="w-full lg:w-3xl mx-4 lg:mx-auto my-4 flex flex-col gap-8">
      <Card className="flex flex-row justify-between">
        <CardContent className="flex flex-row gap-4 items-center justify-center">
          <Avatar size="xl">
            <AvatarImage src={user?.avatarUrl} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-bold text-neutral-900">
              {user?.name}
            </Label>
            <Label className="text-lg text-neutral-900">{user?.name}</Label>
          </div>
        </CardContent>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="link">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription className="mx-auto">
                  <Avatar size="xl">
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue={user?.name} />
                </Field>
                <Field>
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue={user?.username}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Change Profile
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </Card>

      <Tabs defaultValue="post">
        <TabsList variant="line">
          <TabsTrigger value="post">Your Post</TabsTrigger>
          <TabsTrigger value="change_password">Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="post">
          <div className="">
            <ArticleMyPostList
              articles={myPostQuery.data?.data}
              onDelete={handleDelete}
            />
          </div>
        </TabsContent>
        <TabsContent value="change_password">
          <div className="flex flex-col gap-4 lg:w-lg w-full mt-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="currentPassword" className="font-bold">
                  Current Password
                </Label>
              </div>
              <PasswordInput
                id="currentPassword"
                // value={form.password}
                // onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="newPassword" className="font-bold">
                  New Password
                </Label>
              </div>
              <PasswordInput
                id="newPassword"
                // value={form.confirmPassword}
                // onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword" className="font-bold">
                  Confirm Password
                </Label>
              </div>
              <PasswordInput
                id="confirmPassword"
                // value={form.confirmPassword}
                // onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Button type="submit" className="w-full bg-primary-300">
                Update Password
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
