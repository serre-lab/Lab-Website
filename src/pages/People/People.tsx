import { Title, Divider, List } from "@mantine/core";
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

  // Split Brown people into three groups: first row (up to Alekh), second row (PhD students), third row (MSc students)
  const alekhIndex = brownPeople.findIndex(person => person.fullName === "Alekh Ashok");
  const firstMscIndex = brownPeople.findIndex(person => person.title === "MSc student");
  
  const brownFirstRow = brownPeople.slice(0, alekhIndex); // Thomas, Drew, Chris (before Alekh)
  const brownSecondRow = brownPeople.slice(alekhIndex, firstMscIndex); // PhD students (Alekh onwards until first MSc)
  const brownThirdRow = brownPeople.slice(firstMscIndex); // MSc students and anyone after

  return (
    <div className="people-container">
      <Title order={1} className="page-title">People</Title>

      {/* Brown Section */}
      {brownPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Brown University Team ({brownPeople.length})
          </Title>
          
          {/* First row: Thomas and Drew */}
          <div className="people-grid">
            {brownFirstRow.map((person: any, index: number) => (
              <Person
                key={`brown-first-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
              />
            ))}
          </div>

          {/* Second row: PhD students */}
          <div className="people-grid">
            {brownSecondRow.map((person: any, index: number) => (
              <Person
                key={`brown-second-${index}`}
                fullName={person.fullName}
                title={person.title}
                university={person.university}
                description={person.description}
                imagePath={person.imagePath}
              />
            ))}
          </div>

          {/* Third row: MSc students */}
          <div className="people-grid">
            {brownThirdRow.map((person: any, index: number) => (
              <Person
                key={`brown-third-${index}`}
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

      {/* ANITI Section */}
      {anitiPeople.length > 0 && (
        <>
          <Divider my="md" />
          <Title order={2} className="people-section-title">
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
          <Divider my="md" />
          <Title order={2} className="people-section-title">
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
          <Divider my="md" />
          <Title order={2} className="people-section-title">
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
