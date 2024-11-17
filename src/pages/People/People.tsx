import { Title } from "@mantine/core";
import Person from "../../components/Person/Person";
import peopleData from "../../data/people.json";
import "./People.css";

interface Person {
    fullName: string;
    title: string;
    description: string;
    imagePath: string;
}
function normalizeTitle(title: string): string {
    return title.replace(/\s+/g, "").replace(/\(.*?\)/g, "");
}

function groupPeopleByTitle(people: any) {
    return people.reduce((acc: any, person: Person) => {
        const normalizedTitle = normalizeTitle(person.title);
        if (!acc[normalizedTitle]) {
            acc[normalizedTitle] = { originalTitle: person.title, people: [] };
        }
        acc[normalizedTitle].people.push(person);
        return acc;
    }, {});
}

export default function People() {
    const groupedPeople = groupPeopleByTitle(peopleData.people);

    return (
        <div className="people-container">
            <Title>Meet the Team</Title>
            {Object.keys(groupedPeople).map((normalizedTitle) => (
                <div key={normalizedTitle} className="groupedPeople-container">
                    <Title order={2}>
                        {groupedPeople[normalizedTitle].originalTitle}
                    </Title>
                    <div
                        className={
                            groupedPeople[normalizedTitle].people.length < 4
                                ? "people-flex"
                                : "people-grid"
                        }
                    >
                        {groupedPeople[normalizedTitle].people.map(
                            (person: any, index: number) => (
                                <Person
                                    key={index}
                                    fullName={person.fullName}
                                    title={person.title}
                                    description={person.description}
                                    imagePath={person.imagePath}
                                />
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
