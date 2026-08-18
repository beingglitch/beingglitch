import { Column, Media, MasonryGrid, Text } from "@once-ui-system/core";
import { getGalleryImages } from "@/utils/gallery-db";

export default async function GalleryView() {
  const images = await getGalleryImages();

  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {images.map((image, index) => (
        <Column key={image.id} gap="8">
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.url}
            alt={image.caption ?? ""}
          />
          <Column gap="2">
            {image.caption && <Text variant="body-default-s">{image.caption}</Text>}
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {new Date(image.takenAt).toLocaleDateString()}
            </Text>
          </Column>
        </Column>
      ))}
    </MasonryGrid>
  );
}
