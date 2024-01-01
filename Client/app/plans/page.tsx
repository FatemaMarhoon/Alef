'use client'
import React, { useEffect, useState } from "react";
import { Plan } from "../../types/plan"
import { getPlans } from "../../services/planService"
import Package from "@/components/Packages/package";
import Loader from "@/components/common/Loader";

const SubscriptionPlansPage = () => {

    return (
        <>
        <Package></Package>
        </>
    );
};

export default SubscriptionPlansPage;
