import Button from "./Button"
import { format, isFuture, isSameDay, subDays } from "date-fns"
import { useHabits, type Habit } from "../context/HabitProvider";



type HabitListProps =
{
    visibleDates: Date[]
}

export default function HabitList({visibleDates}: HabitListProps)
{   
    const {habits} = useHabits()

    if (habits.length === 0)
    {
        return <p className="text-center text-zinc-500 py-12">No habits yet. Add one to get started!</p>
    }

    else        
    {
        return ( 
        <div className="flex flex-col gap-4 py-4">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates}/>
            ))}
        </div>
        )
    }
}

type HabitItemProps = 
{
    habit: Habit
    visibleDates: Date[]
}

function HabitItem({habit, visibleDates}: HabitItemProps)
{
    const {deleteHabit, toggleHabit} = useHabits()


    const streak = getStreak(habit.completions)
        
    return (
        <div className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <span className="font-medium ">{habit.name}</span> 
                    {streak !== 0 && 
                        (<span className="text-sm font-bold text-amber-400">{streak}</span>)
                    }                   
                </div>
                <Button onClick={() => deleteHabit(habit.id)} variant="destructive">Delete</Button>
            </div>

            <div className="flex justify-between gap-1.5">
                {visibleDates.map(date => (
                    <Button 
                    key={date.toISOString()} 
                    disabled={isFuture(date)} 
                    className="flex flex-1 flex-col items-center px-0 gap-1 rounded-2xl text-sm"
                    variant={habit.completions.some(d => isSameDay(date, d)) ? "primary" : "secondary"}
                    onClick={() => toggleHabit(habit.id, date)}
                    >
                        <span className="font-medium">{format(date, "EEE")} </span>
                        <span>{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function getStreak(completion: Date[])
{
    let streak = 0
    let date = new Date()

    while (completion.some(c => isSameDay(c, date)))
    {
        streak++
        date = subDays(date, 1)
    }

    return streak
}