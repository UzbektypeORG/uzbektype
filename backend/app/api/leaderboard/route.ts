import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/leaderboard - Get leaderboard data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testType = searchParams.get('testType') || 'all';
    const difficulty = searchParams.get('difficulty') || 'all';
    const timeRange = searchParams.get('timeRange') || 'all'; // all, today, week, month
    const limit = parseInt(searchParams.get('limit') || '50');

    // Build query
    let query = supabase
      .from('test_results')
      .select(`
        *,
        users (
          id,
          username,
          display_name,
          avatar_url
        )
      `);

    // Add filters
    if (testType !== 'all') {
      query = query.eq('test_type', testType);
    }
    
    if (difficulty !== 'all') {
      query = query.eq('difficulty', difficulty);
    }

    // Add time range filter
    if (timeRange !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      query = query.gte('created_at', startDate.toISOString());
    }

    // Order by WPM and accuracy
    query = query
      .order('wpm', { ascending: false })
      .order('accuracy', { ascending: false })
      .limit(limit * 3); // Get more results to filter duplicates

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard' },
        { status: 500 }
      );
    }

    // Filter to get best result per user
    const uniqueUsers = new Map();
    const filteredLeaderboard = (data || [])
      .filter((result) => {
        if (!uniqueUsers.has(result.user_id)) {
          uniqueUsers.set(result.user_id, true);
          return true;
        }
        return false;
      })
      .slice(0, limit);

    return NextResponse.json(filteredLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
