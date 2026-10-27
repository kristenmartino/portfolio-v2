import type { Metadata } from "next";
import AssessmentDocument from "../AssessmentDocument";

export const metadata: Metadata = {
  title: "Analytics review work sample · Kristen Martino",
  alternates: { canonical: "/work-with-me/sample-assessment/hiring" },
  description:
    "An analytics review work sample: selected review examples, business calculations, data claims, and preserved verification evidence.",
};

export default function SampleAssessment() {
  return <AssessmentDocument audience="hiring" />;
}
