import * as React from "react";
import { useAtom } from "jotai";
import axios from "axios";
import { useRouter } from "next/navigation";

import { data } from "@/store";
import { selectedSearchFilter, typedSearchValue } from "@/store/home";
import { Project } from "@/models/project";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const navigate = useRouter();

  const [projects, setProjects] = React.useState<Project[]>([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser] = useAtom(data);
  const [selectedFilters] = useAtom(selectedSearchFilter);
  const [searchText] = useAtom(typedSearchValue);

  const fetching = React.useRef(false);
  const containerRef = React.useRef<any>(null);
  const [currentPage, setCurrentPage] = React.useState(0);
  const lastPageTriggered = React.useRef(false);

  const getProjects = React.useCallback(async () => {
    if (
      selectedFilters.includes("projects") ||
      selectedFilters.includes("all")
    ) {
      setIsLoading(true);
      fetching.current = true;
      // TODO include pagination
      const result = await axios.get(
        `/api/project/list?searchText=${searchText}`,
      );

      setProjects(result.data);
      fetching.current = false;
      setIsLoading(false);
    } else {
      setProjects([]);
    }
  }, [searchText, selectedFilters]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    if (
      containerRef.current.scrollHeight - containerRef.current.scrollTop <=
      containerRef.current.clientHeight + 50
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onProjectSelect = (address: string) => {
    navigate.push(`/create/project/${address}`);
  };

  React.useEffect(() => {
    if (fetching.current) return;
    getProjects();
  }, [currentUser, searchText]);

  if (isLoading) return <></>;

  if (projects?.length === 0) return <></>;

  return (
    <div id="projects" className="w-full flex flex-col mb-4">
      <div className="w-full flex justify-between px-4">
        <p className="text-white text-base">
          Projects<span className="text-gray-500"></span>
        </p>

        <a
          className="underline text-white cursor-pointer text-base"
          href={`${process.env.NEXT_PUBLIC_APP_MAIN_URL}/create/projects`}
        >
          Go to Project Directory
        </a>
      </div>
      <div
        className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 px-4 flex mt-4 overflow-x-hidden"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {projects.map((value) => (
          <div
            className="cursor-pointer flex justify-center"
            onClick={() => onProjectSelect(value.key)}
            key={value._id?.toString()}
          >
            <ProjectCard
              name={value.name}
              image={value.image}
              description={value.desc}
              key={value.key}
              symbol={value.symbol}
              price={value.price.toString()}
              launchDate={new Date(value.dexlistingdate)}
              soldInPresale={value.minpresalesupply}
              supply={value.presalesupply}
              fdv={value.presalesupply * value.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
