import { Link } from "react-router-dom";
import Learn from "../../components/LearnMoreAbout/Learn";
import "./Home.css";
import { Title, Text } from "@mantine/core";

export function Home() {
    return (
        <div className="home-container">
            {/* Image + Title */}
            <div className="image-wrapper">
                <Title aria-label="lab title">Serre Lab</Title>
                <Text aria-label="lab one-liner" size="xl">
                    Understanding the neural computations supporting visual
                    perception
                </Text>
            </div>

            {/* Content */}

            <Learn />
            <div className="home-content">
                <Text size="lg">
                    We are proud members of the{" "}
                    <Link to="https://carney.brown.edu/">
                        Carney Institute for Brain Science
                    </Link>{" "}
                    and the{" "}
                    <Link to={"https://ccbs.carney.brown.edu/"}>
                        Center for Computational Brain Science
                    </Link>{" "}
                    at Brown! We also work in close collaboration with and
                    leverage resources from the{" "}
                    <Link to={"https://ccv.brown.edu/"}>
                        Center for Computation and Visualization
                    </Link>
                    .
                </Text>
                <Text size="lg">
                    There is little doubt that even a partial solution to the
                    question of which computations are carried out by the visual
                    cortex would be a major breakthrough: It would begin to
                    explain one of our most amazing abilities, vision; and it
                    would open doors to other aspects of intelligence such as
                    language, planning or reasoning. It would also help connect
                    neurobiology and mathematics, making it possible to develop
                    computer algorithms that follow the information-processing
                    principles used by biological organisms and honed by natural
                    evolution.
                </Text>
                <Title order={2}>Prospective Students</Title>
                <Text size="lg">
                    The lab is actively recruiting! Brown undergrad and MSc
                    students interested in conducting research in the lab are
                    encouraged to email Prof. Serre with a copy of their course
                    transcript and resume/CV. Students are expected to have
                    taken a CS intro sequence and at least one course in machine
                    learning, computer vision, and/or deep learning.
                </Text>
                <Text size="lg">
                    Prospective Ph.D. students can apply to the graduate
                    programs in cognitive science, computer science and/or
                    neuroscience. They are welcome to email Prof. Serre.
                    However, due to the high volume of applicants, Prof. Serre
                    can only meet with prospective students after their
                    application successfully passes the initial stage of
                    admission.
                </Text>
                <Text size="lg">
                    Prospective postdoc applicants should email Prof. Serre
                    directly.
                </Text>
            </div>
            <div></div>
        </div>
    );
}
