import TaskVariant from "./TaskVariant/TaskVariant"

const Tasks = () => {
	const VARIABLES = {
		title: "Задачи",
		taskVariants: [
			{
				type: "actual",
				title: "Актуальные",
			},
			{
				type: "overdue",
				title: "Просроченные",
			},
			{
				type: "onConfirmation",
				title: "На проверке",
			},
		],
	}

	return (
		<section className="tasks">
			<div className="tasks__inner">
				<div className="tasks__header">
					<h2 className="tasks__header_title">{VARIABLES.title}</h2>
				</div>
				<div className="tasks__content">
					<ul className="tasks__variants">
						{/* {VARIABLES.taskVariants.map(tasksType => (
							<TaskVariant
								tasksType={tasksType}
								key={tasksType.type}
								tasks={userData.tasks}
							/>
						))} */}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Tasks
