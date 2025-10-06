import { Title, List } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import alumniData from "../../data/alumni.json";
import "./People.css";

// Define the desired role order
const ROLE_ORDER = [
  "Professor",
  "Assistant Professor of Research",
  "PostDoc",
  "PhD student",
  "MSc student",
  "Research Assistant",
  "Undergraduate student",
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

  // Split Brown people into Senior Personnel and Graduate Students
  const seniorPersonnel = brownPeople.filter(person =>
    person.title === "Professor" ||
    person.title === "Assistant Professor of Research" ||
    person.title === "PostDoc"
  );

  const graduateStudents = brownPeople.filter(person =>
    person.title === "PhD student" ||
    person.title === "MSc student"
  );

  return (
    <div className="people-container">
      <Title order={1} className="page-title">People</Title>

      {/* Brown Section */}
      {brownPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Brown Team ({brownPeople.length})
          </Title>

          {/* Senior Personnel Section */}
          {seniorPersonnel.length > 0 && (
            <>
              <Title order={3} className="subsection-title">
                Senior Personnel ({seniorPersonnel.length})
              </Title>
              <div className="people-grid">
                {seniorPersonnel.map((person: any, index: number) => (
                  <Person
                    key={`senior-${index}`}
                    fullName={person.fullName}
                    title={person.title}
                    university={person.university}
                    description={person.description}
                    imagePath={person.imagePath}
                  />
                ))}
              </div>
            </>
          )}

          {/* Graduate Students Section */}
          {graduateStudents.length > 0 && (
            <>
              <Title order={3} className="subsection-title">
                Graduate Students ({graduateStudents.length})
              </Title>
              <div className="people-grid">
                {graduateStudents.map((person: any, index: number) => (
                  <Person
                    key={`grad-${index}`}
                    fullName={person.fullName}
                    title={person.title}
                    university={person.university}
                    description={person.description}
                    imagePath={person.imagePath}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* ANITI Section */}
      {anitiPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            ANITI Team ({anitiPeople.length})
          </Title>
          <div className="people-grid">
            {anitiPeople.map((person: any, index: number) => (
              <Person
                key={`aniti-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
              />
            ))}
          </div>
        </>
      )}

      {/* General Section */}
      {generalPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Collaborators ({generalPeople.length})
          </Title>
          <div className="people-grid">
            {generalPeople.map((person: any, index: number) => (
              <Person
                key={`general-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
              />
            ))}
          </div>
        </>
      )}

      {/* Alumni Section */}
      {alumniData.alumni && alumniData.alumni.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Alumni ({alumniData.alumni.length})
          </Title>
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
