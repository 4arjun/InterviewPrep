from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Experience
from .serializers import ExperienceSerializer

@api_view(['GET'])
def get_all_experiences(request):
    experiences = Experience.objects.all().order_by('-created_at')
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_experience_by_id(request, experience_id):
    try:
        experience = Experience.objects.get(id=experience_id)
        serializer = ExperienceSerializer(experience)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Experience.DoesNotExist:
        return Response({'error': 'Experience not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def submit_experience(request):
    data = request.data.copy()
    # Map frontend field names to backend model fields if needed
    # For example, handle author/author_name, offeredPackage/offered_package, etc.
    if 'author' in data:
        data['author_name'] = data.pop('author')
    if 'offeredPackage' in data:
        data['offered_package'] = data.pop('offeredPackage')
    if 'interviewType' in data:
        data['interview_type'] = data.pop('interviewType')
    if 'jobLocation' in data:
        data['job_location'] = data.pop('jobLocation')
    if 'resumeLink' in data:
        data['resume_link'] = data.pop('resumeLink')
    if 'graduationYear' in data:
        data['graduation_year'] = data.pop('graduationYear')
    if 'interviewMonth' in data:
        data['interview_month'] = data.pop('interviewMonth')
    if 'interviewYear' in data:
        data['interview_year'] = data.pop('interviewYear')
    if 'numberOfRounds' in data:
        data['number_of_rounds'] = data.pop('numberOfRounds')
    if 'finalOutcome' in data:
        data['final_outcome'] = data.pop('finalOutcome')
    if 'offerAccepted' in data:
        data['offer_accepted'] = data.pop('offerAccepted')
    if 'numberOfOffers' in data:
        data['number_of_offers'] = data.pop('numberOfOffers')
    if 'preparationStrategy' in data:
        data['preparation_strategy'] = data.pop('preparationStrategy')
    if 'whatToDoDifferently' in data:
        data['what_to_do_differently'] = data.pop('whatToDoDifferently')
    if 'tipsForJuniors' in data:
        data['tips_for_juniors'] = data.pop('tipsForJuniors')
    if 'difficultyRating' in data:
        data['difficulty_rating'] = data.pop('difficultyRating')
    if 'preparationTime' in data:
        data['preparation_time'] = data.pop('preparationTime')
    if 'showProfile' in data:
        data['show_profile'] = data.pop('showProfile')
    if 'agreeToTerms' in data:
        data['agree_to_terms'] = data.pop('agreeToTerms')
    serializer = ExperienceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Experience saved successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
