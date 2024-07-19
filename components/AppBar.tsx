"use ";

import NavLink from "./NavLink";

type AppBarProps = {
  title: string;
};
const AppBar: React.FC<AppBarProps> = ({ title }) => {
  return (
    <nav className="bg-sugar p-3 w-full">
      <div className="grid grid-cols-3 text-center">
        <div className="flex-1"></div>
        <div className="font-bold flex flex-1 text-center align-middle justify-center self-center  text-rose text-4xl font-playwrite">
          {title}{" "}
        </div>

        <ul className="font-semibold flex flex-row justify-end ">
          <li>
            <NavLink href="/">My Calendar</NavLink>
          </li>
          <li>
            <NavLink href="/my-period">My Period</NavLink>
          </li>
          <li>
            <NavLink href="/my-todo-list">My Todo List</NavLink>
          </li>
          <li>
            <NavLink href="/my-statistics">My Statistics</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default AppBar;
