import React from "react";
import carmonImage from "../public/assets/projects/carmon.png";
import modiImage from "../public/assets/projects/modi.png";
import eaexpoImage from "../public/assets/projects/eaexpo.png";
import expenseCalculatorImage from "../public/assets/projects/expense_calculator.png";
import excelsiorImage from "../public/assets/projects/excelsior_clinic.png";
import eventsImage from "../public/assets/projects/events.png";
import schoolImage from "../public/assets/projects/school_frontend.png";
import mentaImage from "../public/assets/projects/menta_social_app.png";

import ProjectItem from "../components/ProjectItem";
const Projects = () => {
	return (
		<div className="w-full">
			<div className="max-w-[1240px] mx-auto px-2 py-16">
				<p className="uppercase text-xl tracking-widest text-[#5651e5]">
					Projects
				</p>
				<h2 className="py-4">What I &#39; ve Build</h2>
				<div className="grid md:grid-cols-2 gap-8">
					<ProjectItem
						title="Carmon"
						image={carmonImage}
						projUrl="/carmon"
						buildWith="Wordpress"
					/>
					<ProjectItem
						title="MODI"
						image={modiImage}
						projUrl="/modi"
						buildWith="React JS"
					/>
					<ProjectItem
						title="EAEXPO"
						image={eaexpoImage}
						projUrl="/eaexpo"
						buildWith="Django"
					/>
					<ProjectItem
						title="Expense Calculator"
						image={expenseCalculatorImage}
						projUrl="/expense-calculator"
						buildWith="Django"
					/>
					<ProjectItem
						title="Excelsior Clinic"
						image={excelsiorImage}
						projUrl="/excelsior"
						buildWith="Django / React JS"
					/>
					<ProjectItem
						title="Events Abrites"
						image={eventsImage}
						projUrl="/events-abrites"
						buildWith="Django"
					/>
					<ProjectItem
						title="School Layout"
						image={schoolImage}
						projUrl="/school-layout"
						buildWith="Django"
					/>

					<ProjectItem
						title="Ment Social App"
						image={mentaImage}
						projUrl="/menta-social"
						buildWith="React JS"
					/>
				</div>
			</div>
		</div>
	);
};

export default Projects;
