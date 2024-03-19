import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { UserType } from '../type/user';
import useAsyncStorage from '../hooks/useAsyncStorage';

const index = () => <Redirect href="/splash"/>

export default index;