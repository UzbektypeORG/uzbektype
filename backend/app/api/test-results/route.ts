import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/test-results - Save a new test result
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      userId,
      language,
      testType,
      difficulty,
      wpm,
      accuracy,
      stars,
      correctChars,
      incorrectChars,
      totalChars,
      timeElapsed,
    } = body;

    // Validate required fields
    if (!userId || !language || !testType || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert test result using Supabase
    const { data, error } = await supabase
      .from('test_results')
      .insert([
        {
          user_id: userId,
          language,
          test_type: testType,
          difficulty,
          wpm: parseInt(wpm),
          accuracy: parseFloat(accuracy),
          stars: parseInt(stars),
          correct_chars: parseInt(correctChars),
          incorrect_chars: parseInt(incorrectChars),
          total_chars: parseInt(totalChars),
          time_elapsed: parseFloat(timeElapsed),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create test result' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating test result:', error);
    return NextResponse.json(
      { error: 'Failed to create test result' },
      { status: 500 }
    );
  }
}

// GET /api/test-results?userId=xxx - Get user's test results
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId parameter is required' },
        { status: 400 }
      );
    }

    // Fetch test results with user data
    const { data, error } = await supabase
      .from('test_results')
      .select(`
        *,
        users (
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch test results' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching test results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test results' },
      { status: 500 }
    );
  }
}
