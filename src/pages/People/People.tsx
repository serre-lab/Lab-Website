import { Title, Divider } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import "./People.css";

// Define the desired role order
const ROLE_ORDER = [
  "PI",
  "Assistant Prof of Research",
  "PostDoc",
  "Grad student",
  "Research Assistant",
  "Undergraduate Student",
];

export default function People() {
  // Sort people by the custom role order
  const sortedPeople = [...peopleData.people].sort(
    (a, b) =>
      ROLE_ORDER.indexOf(a.title) - ROLE_ORDER.indexOf(b.title)
  );

  return (
    <div className="people-container">
      <Title order={1} className="people-page-title">Meet the Team</Title>
      <Divider my="sm" />
      <div className="people-grid">
        {sortedPeople.map((person: any, index: number) => (
          <Person
            key={index}
            fullName={person.fullName}
            title={person.title}
            university={person.university}
            description={person.description}
            imagePath={person.imagePath}
          />
        ))}
      </div>
    </div>
  );
}
