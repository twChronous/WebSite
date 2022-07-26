import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp } from "phosphor-react";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Project } from "../components/ProjectCard";
import { useGetProjectsQuery } from "../graphql/generated";

export function Projects() {
    const { data, loading } = useGetProjectsQuery();

    if (loading || !data!.projects) {
        return <Loading />
      }
    return (
        <div className="min-h-screen">
            <Header />
            <Link to="/#" className="flex space-x-2 place-items-center ml-[4rem] mt-[4rem]">
                <ArrowLeft size={32}/>
                <p className="text-base font-normal">VOLTAR AO MENU</p>
            </Link>
        <div className="flex ml-[40vw] mb-10 mt-[3rem] gap-8 p-5">
            <h1 className="font-semibold text-xl sm:text-5xl mb-1.5">PROJETOS</h1>
        </div>
        <div className="flex justify-between ml-[9vw] mr-[9vw] ">
                <p className="flex gap-2 items-center text-base font-semibold uppercase">Ordenar por: data <ArrowUp size={16}/> </p> 
                <p className="text-base font-semibold uppercase">{data?.projects.length} Projeto(s) no momento</p>
            </div>

        <div className="flex flex-wrap content-center mb-10 -ml-5 mt-10 md:content-center md:ml-[9vw]">
            { data &&
                data?.projects.length > 0 ?
                data?.projects.map(project => {
                    return (
                        <Project
                        key={project.id}
                        slug={project.slug}
                        name={project.name}
                        isDone= {project.isDone}
                        resumedName={project.tecnologies[0].resumedName}
                        emojiName={project.tecnologies[0].emojiName}
                        createdAt={new Date(project.createdAt)}
                    />
                        )
                    })
                    : <p className="ml-8 mr-10 sm:ml-5">Não há nenhuma atividade para ser mostrada no momento :/</p>
            }
                </div>
            <hr className="self-end mt-auto mb-10 w-full border-gray-700"/>
        </div>
    )
}