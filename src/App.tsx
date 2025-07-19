import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import Terms from "./pages/Terms";
import Teams from "./pages/Teams";
import Simulations from "./pages/Simulations";
import PitStopSimulator from "./components/PitStopSimulator";
import Tracks from "./pages/Tracks";
import Tech from "./pages/Tech";
import Rules from "./pages/Rules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/simulations/pit-stop" element={<PitStopSimulator />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/rules" element={<Rules />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
