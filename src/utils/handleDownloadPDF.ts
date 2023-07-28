export async function handleDownloadPDF({
  url,
  filename,
}: {
  url: string;
  filename?: string;
}) {
  let link: HTMLAnchorElement | undefined;

  try {
    const response = await fetch(url);
    const file = await response.blob();

    link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = filename ?? new Date().getTime() + "";

    link.style.position = "absolute";
    link.style.left = "-999999px";

    document.body.prepend(link);

    link.click();
  } catch (e) {
    window.alert(`Failed to download the file`);
    console.error(e);
  } finally {
    link?.remove();
  }
}
