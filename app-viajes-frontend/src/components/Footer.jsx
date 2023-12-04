import { BsLinkedin, BsGithub, BsFillCSquareFill } from "react-icons/bs";
export const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 ms-5 d-flex align-items-center">
        <a href="https://alucase.github.io/" className="mb-3 me-2 mb-md-0 lh-1">
          <BsFillCSquareFill />
        </a>
        <span className="mb-3 mb-md-0">2023 Lucas Acosta</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex fs-4">
        <li className="ms-3">
          <a className="text-body" href="https://github.com/ALucasE">
            <BsGithub />
          </a>
        </li>
        <li className="ms-3 me-5">
          <a className="text-body" href="https://www.linkedin.com/in/alucase/">
            <BsLinkedin />
          </a>
        </li>
      </ul>
    </footer>
  );
};
