import type { Metadata } from "next";
import AssessmentDocument from "./AssessmentDocument";

export const metadata: Metadata = {
  title: "Sample AI feature assessment · Kristen Martino",
  alternates: { canonical: "/work-with-me/sample-assessment" },
  description:
    "An example of a scoped feature assessment: observed issues, priorities, recommended changes and dated verification, with the full supporting evidence.",
};

export default function SampleAssessment() {
  return <AssessmentDocument audience="client" />;
}
