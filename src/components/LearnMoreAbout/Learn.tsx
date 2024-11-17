import { Title, Text } from "@mantine/core";
import { FaVial, FaHand, FaBookOpen, FaMicrophone } from "react-icons/fa6";
import "./Learn.css";
import { Link } from "react-router-dom";

export default function Learn() {
    return (
        <div className="learn-container">
            <Title order={3} className="learn-title">
                I want to learn more about...
            </Title>
            <div className="icon-desc-container">
                <div>
                    <Link to="research">
                        <FaVial size={56} />
                        <Text size="lg">Research</Text>
                    </Link>
                </div>
                <div>
                    <Link to="people">
                        <FaHand size={56} />
                        <Text size="lg">People</Text>
                    </Link>
                </div>
                <div>
                    <Link to="resources">
                        <FaBookOpen size={56} />
                        <Text size="lg">Resources</Text>
                    </Link>
                </div>
                <div>
                    <Link to="scicomm">
                        <FaMicrophone size={56} />
                        <Text size="lg">Sci-Comm</Text>
                    </Link>
                </div>
            </div>
        </div>
    );
}
