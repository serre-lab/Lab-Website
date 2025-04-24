import { Title, Divider } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import "./People.css";

export default function People() {
  return (
    <div className="people-container">
      <Title order={1} className="people-page-title">Meet the Team</Title>
      <Divider my="sm" />
      <div className="people-grid">
        {peopleData.people.map((person: any, index: number) => (
          <Person
            key={index}
            fullName={person.fullName}
            title={person.title}
            description={person.description}
            imagePath={person.imagePath}
          />
        ))}
      </div>
    </div>
  );
}
