import { useState, useMemo } from "react";
import { Users, MapPin, Monitor, Clock, Calendar, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortfolio } from "@/contexts/PortfolioContext";

export const VisitorsTab = () => {
  const { visitors } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterDevice, setFilterDevice] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Get unique locations and devices for filters
  const locations = useMemo(() => {
    const locs = [...new Set(visitors.map((v) => v.country))];
    return locs.filter(Boolean);
  }, [visitors]);

  const devices = useMemo(() => {
    const devs = [...new Set(visitors.map((v) => v.device))];
    return devs.filter(Boolean);
  }, [visitors]);

  // Filter visitors
  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches =
          visitor.ip.toLowerCase().includes(query) ||
          visitor.location.toLowerCase().includes(query) ||
          visitor.country.toLowerCase().includes(query) ||
          visitor.browser.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Location filter
      if (filterLocation !== "all" && visitor.country !== filterLocation) {
        return false;
      }

      // Device filter
      if (filterDevice !== "all" && visitor.device !== filterDevice) {
        return false;
      }

      // Date filter
      const visitDate = new Date(visitor.visitedAt);
      if (dateFrom && new Date(dateFrom) > visitDate) return false;
      if (dateTo && new Date(dateTo) < visitDate) return false;

      return true;
    });
  }, [visitors, searchQuery, filterLocation, filterDevice, dateFrom, dateTo]);

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterLocation("all");
    setFilterDevice("all");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitors.length}</p>
                <p className="text-muted-foreground text-sm">Total Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {visitors.filter((v) => v.device === "Desktop").length}
                </p>
                <p className="text-muted-foreground text-sm">Desktop</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {visitors.filter((v) => v.device === "Mobile").length}
                </p>
                <p className="text-muted-foreground text-sm">Mobile</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{locations.length}</p>
                <p className="text-muted-foreground text-sm">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDevice} onValueChange={setFilterDevice}>
              <SelectTrigger>
                <SelectValue placeholder="All Devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                {devices.map((dev) => (
                  <SelectItem key={dev} value={dev}>{dev}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="From Date"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="To Date"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4">
            Clear Filters
          </Button>
        </CardContent>
      </Card>

      {/* Visitors List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Visitor Log ({filteredVisitors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredVisitors.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No visitors recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{visitor.ip}</p>
                      <p className="text-muted-foreground text-sm">
                        {visitor.browser} on {visitor.device}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {visitor.location}, {visitor.country}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(visitor.visitedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(visitor.timeSpent)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
