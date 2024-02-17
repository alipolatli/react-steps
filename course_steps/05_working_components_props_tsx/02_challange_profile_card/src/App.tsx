import "./App.css";

interface SkillProps {
  skill: ISkill;
}
interface SkillSectionProps {
  title: string;
  skills: ISkill[];
}

function App() {
  return (
    <div className="card">
      <Avatar />
    </div>
  );
}

function Avatar() {
  return (
    <div className="avatar">
      <h1>Ali Polatlı</h1>
      <img src="https://media.licdn.com/dms/image/D4D03AQHf-9eMe6SPqQ/profile-displayphoto-shrink_800_800/0/1691194217481?e=1713398400&v=beta&t=6cp4Z_LNIHttpYYvAgEOPlG7RgnYfIpW9KSBmoyaREs" width={400} alt="Avatar" />
      <div className="data">
        <Intro />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div >
      <h2>Introduction</h2>
      <p>
        I am a passionate software developer with dealing in .NET, React, AWS and other technologies.
      </p>
      <SkillList />
    </div>
  );
}

function SkillList() {
  return (
    <div className="skills">
      <h2>Skills</h2>
      <SkillSection title="Backend Skills" skills={skills} />
      <SkillSection title="Frontend Skills" skills={frontendSkills} />
      <SkillSection title="Database Skills" skills={databaseSkills} />
      <SkillSection title="DevOps Skills" skills={devopsSkills} />

    </div>
  );
}

function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {skills.map((skill) => (
          <Skill key={skill.name} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

function Skill({ skill }: SkillProps) {
  const getColorClass = (point: number) =>
  point < 3 ? "low-point" : point <= 6 ? "low-medium-point" : point <= 7 ?  "medium-point" : "medium-high-point";

  const getEmoji = (point: number) =>
    point < 3 ? "🧐" : point <= 6 ? "🤔" : point <= 7 ?  "😀" : "😎";

  return (
    <li className={getColorClass(skill.point)}>
      {skill.name} - {skill.point} {getEmoji(skill.point)}
    </li>
  );
}

const skills: ISkill[] = [
  { name: "OOP", point: 8 },
  { name: ".NET Core", point: 8 },
  { name: "Node.Js", point: 5 },
  { name: "ASP.NET Core", point: 8 },
  { name: "Entity Framework Core", point: 8 },
  { name: "Web API", point: 8 },
  { name: "LINQ", point: 8 },
  { name: "RESTful API Design", point: 8 },
  { name: "Microservices Architecture", point: 7 },
  { name: "Apache Kafka", point: 7 },
  { name: "RabbitMQ", point: 7 },
  { name: "Unit Testing (NUnit, xUnit)", point: 5 },
  { name: "GO", point: 1 },
];

// Add 10 more skills related to JavaScript, TypeScript, React, MongoDB, etc.
const frontendSkills: ISkill[] = [
  { name: "JavaScript", point: 6 },
  { name: "TypeScript", point: 7 },
  { name: "React", point: 5 },
  { name: "Angular", point: 1 },
];

const databaseSkills: ISkill[] = [
  { name: "MSSQL", point: 9 },
  { name: "ElasticSearch", point: 8 },
  { name: "Postgres", point: 6 },
  { name: "MongoDB", point: 8 },
  { name: "MySQL", point: 1 },
  { name: "Redis", point: 7 },
];


const devopsSkills: ISkill[] = [
  { name: "Docker", point: 7 },
  { name: "AWS", point: 4 },
  { name: "Debezium", point: 6 },
  { name: "IIS", point: 3 },
];

interface ISkill {
  name: string;
  point: number;
}

export default App;
