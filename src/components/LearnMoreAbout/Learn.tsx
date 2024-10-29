import { Title } from "@mantine/core";
import { FaVial, FaHand, FaBookOpen, FaMicrophone } from "react-icons/fa6";

export default function LearnMoreAbout() {
    return (
        <div>
            <Title>I want to learn more about...</Title>
            <div>
                <div>
                    <FaVial />
                </div>
                <div>
                    <FaHand />
                </div>
                <div>
                    <FaBookOpen />
                </div>
                <div>
                    <FaMicrophone />
                </div>
            </div>
        </div>
    );
}
