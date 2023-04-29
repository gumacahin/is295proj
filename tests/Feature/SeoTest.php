<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\HtmlString;

class SeoTest extends TestCase
{
    /**
     * HomePage exists.
     */
    public function test_homepage_exists(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * The title of the homepage is the env variable APP_NAME.
     * @see config('app.name')
     *  SEO title length should be 50-60. Settle for the middle for now.
     */
    public function test_home_page_title_is_app_name(): void
    {
        $title = config('app.name');
        $titleLength = strlen($title);
        // TODO: A/B test
        // SEO title length should be 50-60. Settle for the middle for now.
        $maxTitleLength = 60;
        $minTitleLength = 50;

        $this->assertLessThanOrEqual($maxTitleLength, $titleLength);
        $this->assertGreaterThanOrEqual($minTitleLength, $titleLength);

        $response = $this->get('/');
        $response->assertSee(new HtmlString('<title inertia>' . $title . '</title>'));
    }

    /**
     * The description of the homepage:
     * @see config(app.description);
     * SEO: description length should be 150-160.
     *
     */
    public function test_homepage_description_is_app_description(): void
    {
        $description = config('app.description');
        $descriptionLength = strlen($description);
        // TODO: A/B test
        // SEO description length should be 150-160. Settle for the middle for now.
        $minDescriptionLength = 150;
        $maxDescriptionLength = 160;
        // $maxDescriptionLength = 155;

        $this->assertGreaterThanOrEqual($minDescriptionLength, $descriptionLength);
        $this->assertLessThanOrEqual($maxDescriptionLength, $descriptionLength);

        $response = $this->get('/');
        $response->assertSee($description);
        $response->assertSee(new HtmlString('<meta name="description" content="' . $description . '">'));
    }

    /**
     * The the keywords of the homepage:
     * @see config('app.keywords');
     * SEO: avoid keyword stuffing
     *
     */
    public function test_homepage_keywords_is_app_keywords(): void
    {
        $keywords = config('app.keywords');
        $keywordsLength = strlen($keywords);
        $minKeywordsLength = 50;
        $maxKeywordsLength = 60;

        // $this->assertGreaterThanOrEqual($minKeywordsLength, $keywordsLength);
        // $this->assertLessThanOrEqual($maxKeywordsLength, $keywordsLength);

        $response = $this->get('/');
        $response->assertSee($keywords);
        $response->assertSee(new HtmlString('<meta name="keywords" content="' . $keywords . '">'));
    }

}
