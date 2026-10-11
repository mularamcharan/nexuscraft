import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DeepWorkAIPlanner } from '@/components/productivity/DeepWorkAIPlanner';
import { 
  useLocalStorage, 
  ProductivityTask, 
  Habit, 
  Goal, 
} from '@/hooks/useLocalStorage';
import { ProductivityInsights } from '@/components/productivity/ProductivityInsights';
import { 
  Sparkles,
} from 'lucide-react';

export default function Productivity() {
  // Local storage state for offline persistence
  const [tasks, setTasks] = useLocalStorage<ProductivityTask[]>('productivity-tasks', []);
  const [habits, setHabits] = useLocalStorage<Habit[]>('productivity-habits', []);
  const [goals, setGoals] = useLocalStorage<Goal[]>('productivity-goals', []);
  // Planner-created tasks remain available to the AI planner and insights.
  const handleAddTask = (task: ProductivityTask) => {
    setTasks(prev => [...prev, task]);
  };

  // Calculate life metrics for AI planner
  const lifeMetrics = {
    lifeScore: 75,
    energy: 80,
    focus: 70,
    discipline: 65,
    body: 70,
    mind: 75,
    spirit: 80,
    deepWorkMinutes: 120,
    workoutMinutes: 45,
    readingMinutes: 30,
    lastUpdated: new Date().toISOString(),
    history: []
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Productivity Hub
          </h1>
          <p className="text-muted-foreground">
            Build a plan with AI and review your progress. Everything runs offline.
          </p>
        </div>


        {/* Main Tabs */}
        <Tabs defaultValue="ai-planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
            <TabsTrigger value="ai-planner" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Planner</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-planner" className="space-y-6">
            <DeepWorkAIPlanner
              tasks={tasks}
              habits={habits}
              goals={goals}
              metrics={lifeMetrics}
              executionRules={[]}
              onAddTask={handleAddTask}
              onAddHabit={(habit) => setHabits(prev => [...prev, habit])}
              onUpdateRules={() => {}}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <ProductivityInsights
              tasks={tasks}
              habits={habits}
              goals={goals}
            />
          </TabsContent>

        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
