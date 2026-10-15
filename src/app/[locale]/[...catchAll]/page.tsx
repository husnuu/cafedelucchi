import { notFound } from "next/navigation";

// Tanımsız tüm adresler dile özel 404 sayfasını gösterir.
export default function CatchAll() {
  notFound();
}
