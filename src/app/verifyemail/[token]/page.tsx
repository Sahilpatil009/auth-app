import { redirect } from "next/navigation";

interface VerifyEmailTokenPageProps {
    params: {
        token: string;
    };
}

export default function VerifyEmailTokenPage({ params }: VerifyEmailTokenPageProps) {
    redirect(`/verifyemail?token=${encodeURIComponent(params.token)}`);
}