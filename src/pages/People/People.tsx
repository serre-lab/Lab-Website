import { Title } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import alumniData from "../../data/alumni.json";
import "./People.css";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

const nameCollator = new Intl.Collator("en", { sensitivity: "base" });

// Preserve compound surnames when ordering profiles and alumni.
const compoundSurnames: Record<string, string> = {
  "Bastien Le Lan": "Le Lan",
  "Amor Ben Tanfous": "Ben Tanfous",
};

function surname(fullName: string) {
  return compoundSurnames[fullName] ?? fullName.trim().split(/\s+/).pop()!;
}

function compareNames(a: { fullName: string }, b: { fullName: string }) {
  return nameCollator.compare(surname(a.fullName), surname(b.fullName)) ||
    nameCollator.compare(a.fullName, b.fullName);
}

type PersonEntry = (typeof peopleData.people)[number];

// A titled group of person cards within a team section; renders nothing when empty
function PeopleGroup({ title, people }: { title: string; people: PersonEntry[] }) {
  if (people.length === 0) return null;
  return (
    <>
      <Title order={3} className="subsection-title">
        {title} ({people.length})
      </Title>
      <div className="people-grid">
        {people.map((person) => (
          <Person
            key={person.fullName}
            fullName={person.fullName}
            title={person.title}
            university={person.university}
            description={person.description}
            imagePath={person.imagePath}
          />
        ))}
      </div>
    </>
  );
}

export default function People() {
  // Filtering into categories below preserves alphabetical surname order.
  const sortedPeople = [...peopleData.people].sort(compareNames);
  const sortedAlumni = [...alumniData.alumni].sort(compareNames);

  // The PI leads both the Brown and ANITI teams, so is shown on their own and counted in neither
  const principalInvestigators = sortedPeople.filter((person) => person.title === "Professor");

  // Separate Brown and ANITI people
  const brownPeople = sortedPeople.filter(
    (person) => person.university === "Brown" && !principalInvestigators.includes(person)
  );
  const anitiPeople = sortedPeople.filter((person) => person.university === "ANITI");
  const generalPeople = sortedPeople.filter(
    (person) => person.university !== "Brown" && person.university !== "ANITI"
  );

  // Split Brown people into Senior personnel and Graduate Students
  const seniorPersonnel = brownPeople.filter(person =>
    person.title === "Professor" ||
    person.title === "Assistant Professor of Research" ||
    person.title === "PostDoc"
  );

  const phdStudents = brownPeople.filter(person => person.title === "PhD student");
  const mscStudents = brownPeople.filter(person => person.title === "MSc student");
  // Everyone else at Brown (research assistants, undergraduates) so no one is silently dropped
  const otherBrownPeople = brownPeople.filter(person =>
    !seniorPersonnel.includes(person) && !phdStudents.includes(person) && !mscStudents.includes(person)
  );

  return (
    <>
      <HeroBanner 
        title="People" 
        subtitle="Meet the researchers, students, and collaborators"
        backgroundImage="/metcalf.webp"
      />
      <div className="people-container">
      {principalInvestigators.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Principal investigator
          </Title>
          <div className="people-grid">
            {principalInvestigators.map((person, index) => (
              <Person
                key={`pi-${index}`}
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

      {brownPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            Brown team ({brownPeople.length})
          </Title>

          <PeopleGroup title="Senior personnel" people={seniorPersonnel} />
          <PeopleGroup title="PhD students" people={phdStudents} />
          <PeopleGroup title="MSc students" people={mscStudents} />
          <PeopleGroup title="Research assistants" people={otherBrownPeople} />
        </>
      )}

      {/* ANITI Section */}
      {anitiPeople.length > 0 && (
        <>
          <Title order={2} className="section-title">
            ANITI team ({anitiPeople.length})
          </Title>
          <div className="people-grid">
            {anitiPeople.map((person, index) => (
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
            {generalPeople.map((person, index) => (
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
          <ul className="alumni-list body-text">
            {sortedAlumni.map((alumn, idx) => (
              <li key={idx}>
                {alumn.fullName} {alumn.role ? `(${alumn.role})` : ""}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  );
}
