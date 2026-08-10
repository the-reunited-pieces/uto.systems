import { useEffect, useState } from "react";

type Sysinfo = {
    fronters: string[];
    members: { id: string; name: string | null; description: string | null; avatarURL: string | null }[];
};

export function useSysinfo() {
    const [sysinfo, setSysinfo] = useState<Sysinfo | undefined | null>(undefined);

    useEffect(() => {
        fetch(`${process.env.BUN_PUBLIC_API}/sysinfo`)
            .then(async (res) => {
                if (!res.ok) throw null;

                const data = await res.json();
                if (!Array.isArray(data.fronters)) throw null;
                if (!Array.isArray(data.members)) throw null;

                data.fronters.forEach((fronter: any) => {
                    if (typeof fronter !== "string") throw null;
                });

                data.members.forEach((member: any) => {
                    if (!member) throw null;
                    if (typeof member.id !== "string") throw null;
                    if (member.name !== null && typeof member.name !== "string") throw null;
                    if (member.description !== null && typeof member.description !== "string") throw null;
                    if (member.avatarURL !== null && typeof member.avatarURL !== "string") throw null;
                });

                setSysinfo(data);
            })
            .catch(() => setSysinfo(null));
    }, []);

    return sysinfo;
}
