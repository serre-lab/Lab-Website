import { Title, Text } from "@mantine/core";
import {
  FaVial,
  FaHand,
  FaMicrophone,
  FaBookOpen,
  FaBook,
} from "react-icons/fa6";
import "./Learn.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { icon: <FaVial size={48} />, label: "Research", to: "research" },
  { icon: <FaBookOpen size={48} />, label: "Publications", to: "publications" },
  { icon: <FaHand size={48} />, label: "People", to: "people" },
  { icon: <FaBook size={48} />, label: "Resources", to: "resources" },
  {
    icon: <FaMicrophone size={48} />,
    label: "Media",
    to: "sci-comm",
    external: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function Learn() {
  return (
    <div className="learn-container">
      <Title order={2} className="learn-title">
        I want to learn more about...
      </Title>
      <div className="icon-grid">
        {items.map((item, index) => {
          const Wrapper = item.external ? "a" : Link;
          return (
            <motion.div
              key={item.label}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="icon-card"
            >
              <Wrapper
                to={item.to}
                href={item.external ? item.to : undefined}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.icon}
                <Text className="icon-label">
                  {item.label}
                </Text>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
