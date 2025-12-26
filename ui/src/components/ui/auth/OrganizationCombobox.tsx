import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import type { UseFormReturn } from "react-hook-form";
import type { Organization } from "./types";

type OrgValue = { id?: string; name?: string };

interface OrganizationComboboxProps {
  form: UseFormReturn<any>;
  organizations: Organization[];
  /**
   * Path to the field in your form. Defaults to "organization".
   * Should resolve to an object { id?: string; name?: string }.
   */
  namePath?: string;
  placeholder?: string;
  className?: string;
}

export function OrganizationCombobox({
  form,
  organizations,
  namePath = "organization",
  placeholder = "Search or create organization",
  className,
}: OrganizationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // read current form value
  const current: OrgValue = form.watch(namePath) ?? {};
  const selectedId = current?.id ? String(current.id) : undefined;
  const selectedName = current?.name || (selectedId
    ? organizations.find(o => String(o.id) === selectedId)?.name
    : "");

  // filtered list (case-insensitive)
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return organizations;
    return organizations.filter(o => o.name.toLowerCase().includes(q));
  }, [organizations, query]);

  // should we show "Create ..."
  const showCreate =
    query.trim().length > 0 &&
    !organizations.some(o => o.name.toLowerCase() === query.trim().toLowerCase());

  const setOrgValue = (value: OrgValue) => {
    form.setValue(namePath, value, { shouldValidate: true, shouldDirty: true });
  };

  const handleSelectExisting = (org: Organization) => {
    setOrgValue({ id: String(org.id), name: org.name });
    setQuery(org.name);
    setOpen(false);
  };

  const handleCreate = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setOrgValue({ name: clean });
    setQuery(clean);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOrgValue({ id: "", name: "" });
    setQuery("");
  };

  // keep input text in sync when external form value changes
  React.useEffect(() => {
    if (selectedName && query !== selectedName) setQuery(selectedName);
    if (!selectedName && query) {
      // allow stale query only if popover is open; otherwise clear to avoid confusion
      if (!open) setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedName]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className={cn(!selectedName && "text-muted-foreground")}>
            {selectedName || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {(selectedName || query) && (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={handleClear}
                aria-label="Clear selection"
              />
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-60" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type to search…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {showCreate ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleCreate(query)}
                >
                  ➕ Create “{query}”
                </Button>
              ) : (
                <span className="px-2 py-1.5 text-sm text-muted-foreground">
                  No results
                </span>
              )}
            </CommandEmpty>

            {filtered.length > 0 && (
              <CommandGroup heading="Organizations">
                {filtered.map((org) => {
                  const isSelected =
                    selectedId === String(org.id) ||
                    (!!selectedName && selectedName === org.name);
                  return (
                    <CommandItem
                      key={org.id}
                      value={String(org.id)}
                      onSelect={() => handleSelectExisting(org)}
                      className="gap-2"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {org.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {showCreate && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    value={`__create__${query}`}
                    onSelect={() => handleCreate(query)}
                    className="gap-2"
                  >
                    ➕ Create “{query}”
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
