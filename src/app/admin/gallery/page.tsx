import { Column, Heading } from "@once-ui-system/core";
import { getAllGalleryImagesAdmin } from "@/utils/gallery-db";
import { GalleryUploadForm } from "@/components/admin/GalleryUploadForm";
import { GalleryImageRow } from "@/components/admin/GalleryImageRow";
import { BackLink } from "@/components/admin/BackLink";

export default async function AdminGalleryPage() {
  const images = await getAllGalleryImagesAdmin();

  return (
    <Column fillWidth maxWidth="m" gap="24" paddingY="40">
      <BackLink href="/admin" />
      <Heading variant="display-strong-s">Gallery</Heading>
      <GalleryUploadForm />
      <Column fillWidth gap="8">
        {images.map((image) => (
          <GalleryImageRow
            key={image.id}
            id={image.id}
            url={image.url}
            caption={image.caption}
            takenAt={image.takenAt.toISOString()}
          />
        ))}
      </Column>
    </Column>
  );
}
