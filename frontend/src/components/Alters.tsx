import { useSysAlters } from "@/hooks/useSysAlters";
import { Alter } from "@/components/Alter";
import "./alters.css";

export function Alters() {
    const sysalters = useSysAlters();

    const members = sysalters?.members;

    return (
        <>
          <div className="alters">
            {members?.filter(alter => alter.name && !['entity', 'new?'].includes(alter.name)).sort((a, b) => a.name?.localeCompare(b.name||'') || 0).map(alter => (
              <>
                <Alter alter={alter} />
              </>
            ))}
          </div>
        </>
    );
}
