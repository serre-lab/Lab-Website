import { Title, Divider, List } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import alumniData from "../../data/alumni.json";
import "./People.css";

// Define the desired role order
const ROLE_ORDER = [
  "Principal Investigator",
  "Assistant Professor of Research",
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
      {alumniData.alumni && alumniData.alumni.length > 0 && (
        <>
          <Divider my="xl" />
          <Title order={2} className="people-page-title">Alumni</Title>
          <List size="md" spacing="xs" className="alumni-list">
            {alumniData.alumni.map((alumn: any, idx: number) => (
              <List.Item key={idx}>
                {alumn.fullName} {alumn.role ? `(${alumn.role})` : ""}
              </List.Item>
            ))}
          </List>
        </>
      )}
    </div>
  );
}
