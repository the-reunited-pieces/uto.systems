import { useEffect, useState } from "react";

type SysAlters = {
    fronters: string[];
    members: { id: string; name: string | null; display_name: string | null; description: string | null; avatar_url: string | null; pronouns: string | null }[];
};

export function useSysAlters() {
    const [sysalters, setSysalters] = useState<SysAlters | undefined | null>(undefined);

    useEffect(() => {
        fetch(`${process.env.BUN_PUBLIC_API}/sysinfo`)
            .then(async (res) => {
                if (!res.ok) throw null;

                const data = await res.json();
                if (!Array.isArray(data.members)) throw null;

                data.members.forEach((member: any) => {
                    if (!member) throw null;
                    if (typeof member.id !== "string") throw null;
                    if (member.name !== null && typeof member.name !== "string") throw null;
                    if (member.display_name !== null && typeof member.display_name !== "string") throw null;
                    if (member.description !== null && typeof member.description !== "string") throw null;
                    if (member.avatar_url !== null && typeof member.avatar_url !== "string") throw null;
                    if (member.pronouns !== null && typeof member.pronouns !== "string") throw null;
                });

                setSysalters(data);
            })
            .catch(() => setSysalters(null));
    }, []);

    return sysalters;
}
