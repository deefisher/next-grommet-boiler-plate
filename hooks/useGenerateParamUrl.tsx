import { NextRouter, useRouter } from 'next/router';
import React from 'react';

const useGenerateParamUrl = (paramKeys: string[]) => {
    const router = useRouter();

    const generateUrl = (router: NextRouter, paramKeys: string[]): string => {
        const base = router.pathname;
        return paramKeys.reduce(
            (acc: string, key: string): string => acc.replace(`[${key}]`, router?.query?.[key] as string),
            base,
        );
    };
    return generateUrl(router, paramKeys);
};

export default useGenerateParamUrl;
