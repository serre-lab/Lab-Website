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

  // Separate Brown and ANITI people
  const brownPeople = sortedPeople.filter((person) => person.university === "Brown");
  const anitiPeople = sortedPeople.filter((person) => person.university === "ANITI");
  const generalPeople = sortedPeople.filter(
    (person) => person.university !== "Brown" && person.university !== "ANITI"
  );

  return (
    <div className="people-container">
      <Title order={1} className="people-page-title">Meet the Team</Title>
      <Divider my="sm" />

      {/* Brown Section */}
      {brownPeople.length > 0 && (
        <>
          <Title order={2} className="people-page-title">Brown</Title>
          <div className="people-grid">
            {brownPeople.map((person: any, index: number) => (
              <Person
                key={`brown-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
                // university will only show in modal
              />
            ))}
          </div>
        </>
      )}

      {/* ANITI Section */}
      {anitiPeople.length > 0 && (
        <>
          <Divider my="xl" />
          <Title order={2} className="people-page-title">ANITI</Title>
          <div className="people-grid">
            {anitiPeople.map((person: any, index: number) => (
              <Person
                key={`aniti-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
                // university will only show in modal
              />
            ))}
          </div>
        </>
      )}

      {/* General Section */}
      {generalPeople.length > 0 && (
        <>
          <Divider my="xl" />
          <Title order={2} className="people-page-title">General</Title>
          <div className="people-grid">
            {generalPeople.map((person: any, index: number) => (
              <Person
                key={`general-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
                // university will only show in modal
              />
            ))}
          </div>
        </>
      )}

      {/* Alumni Section */}
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
